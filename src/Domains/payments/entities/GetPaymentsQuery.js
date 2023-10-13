class GetPaymentsQuery {
    constructor(payload) {
        this.page = payload.page;
        this.dyn_id = payload.dyn_id;


        Object.keys(this).forEach(
            (key) => this[key] === undefined && delete this[key],
        );
    }
}