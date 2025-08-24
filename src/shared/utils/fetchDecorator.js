export const fetchDecorator = (request) => {
    return async (payload) => {
        try {
            const { data } = await request(payload);
            return { data, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    }
}


