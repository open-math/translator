let templates =
{
    paragraph:      require('./paragraph'),
    errorBlock:     require('./errorBlock'),
    errorInliner:   require('./errorInliner'),
    heading:        require('./heading'),
    math:           require('./math'),
    imath:          require('./imath'),
    image:          require('./image'),
    errorImage:     require('./errorImage'),
    accentBlock:    require('./accentBlock'),
    gallery:        require('./gallery'),
    link:           require('./link'),
    list:           require('./list'),
    array:          require('./array'),
    table:          require('./table'),
    task:           require('./task'),
    todo:           require('./todo'),
}

export function renderTemplate(name: string, locals: object = {})
{
    return templates[name](locals);
}