module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            type: String, // next up, in progress, done
            due: Date, // when it's due
            status: String,
            priority: String,
            description: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Task = mongoose.model("task", schema);
    return Task;
};