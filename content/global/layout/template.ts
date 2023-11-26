let templates =
{
    paragraph:      require('./paragraph'),
    errorBlock:     require('./errorBlock'),
    errorInliner:   require('./errorInliner'),
    heading:        require('./heading'),
    math:           require('./math'),
    figure:         require('./figure'),
    imath:          require('./imath'),
    accentBlock:    require('./accentBlock'),
    gallery:        require('./gallery'),
    link:           require('./link'),
    list:           require('./list'),
    array:          require('./array'),
    table:          require('./table'),
    task:           require('./task'),
    secondary:      require('./secondary'),
    todo:           require('./todo'),
}

export function renderTemplate(name: string, locals: object = {})
{
    return templates[name](locals);
}