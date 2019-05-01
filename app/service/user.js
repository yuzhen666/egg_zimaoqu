'use strict';

const Service = require('egg').Service;
var myDate = new Date()
myDate.setFullYear(2019, 3, 22)

class UserService extends Service {
    async getAll(param) {
        var res, results, totalNum, sort, differ;
        sort = param.sort == 'down' ? 'date desc' : param.sort == 'up' ? 'date' : 'date desc';
        differ = param.differ == '1' ? 30 : param.differ == '2' ? 90 : param.differ == '3' ? 365 : 73000;
        if (param.region == 'all') {
            res = await this.app.mysql.query(
                `select id, region, date, url, title, abstract from zimaoqu where TO_DAYS(NOW()) - TO_DAYS(date) <= ${differ} and abstract like '%${param.keywords}%' order by ${sort}`,
            );
            totalNum = res.length;
            results = res.slice(4 * (param.pageNum), 4 + 4 * (param.pageNum));
            return { results, totalNum };
        } else {
            res = await this.app.mysql.query(
                `select id, region, date, url, title, abstract from zimaoqu where region = '${param.region}' and TO_DAYS(NOW()) - TO_DAYS(date) <= ${differ} and abstract like '%${param.keywords}%' order by ${sort}`,
            );
            totalNum = res.length;
            results = res.slice(4 * (param.pageNum), 4 + 4 * (param.pageNum));
            return { results, totalNum };
        }
    }
}
module.exports = UserService;
