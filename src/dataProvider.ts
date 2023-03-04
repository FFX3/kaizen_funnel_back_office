import axios from "axios"
import { DataProvider, HttpError } from "@pankod/refine-core"
import { stringify } from "querystring"
import { CrudOperators, CrudFilters } from "@pankod/refine-core"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        }
        console.log(error)
        return Promise.reject(customError)
    }
)

// Map refine operators to API operators
const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
            case "gte":
            case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
        case "eq":
            default:
            return "";
    }
};

const generateFilters = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};

    filters?.map((filter): void => {
        if ("field" in filter) {
            const { field, operator, value } = filter;
            const mappedOperator = mapOperator(operator);
            queryFilters[`${field}${mappedOperator}`] = value;
        }
    });

    return queryFilters;
};

export const dataProvider = (apiUrl: string): DataProvider => ({
    getList: async ({ resource, pagination, sort, filters }) => {
        const url = `${apiUrl}/${resource}`;

        const { current = 1, pageSize = 10 } = pagination ?? {};

        const query: {
            _start?: number;
            _end?: number;
            _sort?: string;
            _order?: string;
        } = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        };

        if (sort && sort.length > 0) {
            query._sort = sort[0].field;
            query._order = sort[0].order;
        }

        const queryFilters = generateFilters(filters)
        console.log(url)
        const { data, headers } = await axiosInstance.get(
            url
//            `${url}?${stringify(query)}&${stringify(queryFilters)}`
        );

        const total = +headers["x-total-count"]

        return { data, total }
    },
    
    create: async({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await axiosInstance.post(url, variables);

        return {
            data,
        }
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.patch(url, variables);

        return {
            data,
        };
    },

    deleteOne: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.delete(url, {
            data: variables,
        });

        return {
            data,
        };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await axiosInstance.get(url);

        return {
            data,
        };
    },

    getApiUrl: () => apiUrl,
})

