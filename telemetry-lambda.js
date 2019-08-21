export function handler(event, callback) {
    const body = event.body
    const value = body.value
    const type = body.type
    const name = body.name
    const tags = body.tags

    const tagLength = Object.keys(tags).length
    let counter = 0

    let output = ''
    for (const key in tags) {
        counter += 1
        output += key + ':' + tags[key]
        if (counter !== tagLength) {
            output += ','
        }
    }

    const events = [value, type, name, tags]
    const isEmptyString = event => {
        return event === ''
    }

    if (
        events.every(isEmptyString) === true ||
        Number.isInteger(value) === false ||
        (type !== 'histogram' && type !== 'count') ||
        tagLength > 5
    ) {
        callback(null, {
            statusCode: 400,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                result: 'bad request',
            }),
        })
    } else {
        console.log(`MONITORING|${Date.now()}|${value}|${name}|${output}`)
        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                result: 'success',
            }),
        })
    }
}
