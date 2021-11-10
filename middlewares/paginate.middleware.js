exports.paginatedResults = (req, res, next) => {
    try {
        const page = req.body.page ? parseInt(req.body.page) : 1;
        const limit = req.body.limit ? parseInt(req.body.limit) : 10;
        
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < req.data.length) {
            results.next = {
            page: page + 1,
            limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
            page: page - 1,
            limit: limit
            }
        }

        results.data = req.data.slice(startIndex, endIndex);
        res.paginatedResults = results
        next();
    } catch (e) {
        return next(new ApiError());
    }
}