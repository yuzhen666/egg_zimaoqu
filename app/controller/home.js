'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async getAll() {
        const { ctx } = this;
        const results = await ctx.service.user.getAll(ctx.query);
        ctx.body = {results};
        console.log('ctx.query', ctx.query)
    }
}

module.exports = HomeController;
