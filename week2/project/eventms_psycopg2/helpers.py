def paginate_params(request, per_page=6):
    try:
        page = int(request.args.get('page', '1'))
        if page < 1:
            page = 1
    except ValueError:
        page = 1
    offset = (page - 1) * per_page
    return page, per_page, offset
