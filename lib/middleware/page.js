//fn:某模型的计数函数，page中间件调用此函数算出该模型对应的collection有total条document
//然后用total形成分页对象page放到res.locals中

//perpage:每页显示多少条
module.exports = function(fn, perpage){
  perpage = perpage || 10;
  return function(req, res, next){
    var page = Math.max(
      parseInt(req.param('page') || '1', 10),
      1
    ) - 1;

    fn(function(err, total){
      if (err) return next(err);

      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        // to: page * perpage + perpage - 1,
        to: page * perpage + perpage,
        total: total,
        count: Math.ceil(total / perpage)
      };

      next();
    });
  }
};
