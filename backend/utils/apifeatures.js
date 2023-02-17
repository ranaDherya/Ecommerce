class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        }
        : {};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr};

        // Removing some fields for category
        const removeFields = ["keywords", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for price
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skipProducts = resultsPerPage * (currentPage-1);

        this.query = this.query.limit(resultsPerPage).skip(skipProducts);

        return this;
    }
};

module.exports = ApiFeatures;