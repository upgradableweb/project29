const paginate = ({ page_size: limit = 20, page = 1, sortKey = "updatedAt", sortOrder = -1 }) => {

    const skip = (page - 1) * limit

    const data = []
    if (sortKey) {
        data.push({ $sort: { [sortKey]: sortOrder } })
    }

    if (limit > 100) {
        limit = 100
    }
    data.push({ $skip: skip }, { $limit: limit })

    return [
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data
            },
        },
        {
            $project: {
                results: "$data",
                total: { $arrayElemAt: ["$metadata.total", 0] },
            }
        }
    ]
}

module.exports = paginate