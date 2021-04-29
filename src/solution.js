// Please implement your solution in this file

const prepareData = (launches) => {
    // Call the API and filter the response
    const filteredResponse = launches.filter((launch) => {
        return launch.launch_year === '2018' && launch.rocket.second_stage.payloads.some((payload) => {
            return payload.customers.some((customer) => {
                return customer.includes('NASA')
            })
        })
    })

    // Trim the response to get only required fields
    const trimmedResponse = filteredResponse.map((response) => {
        return {
            flight_number: response.flight_number,
            mission_name: response.mission_name,
            payloads_count: response.rocket.second_stage.payloads.length,
            launch_date_utc: response.launch_date_utc
        }
    })

    // Sort the response based on payloads_count first, then by launch_date_unix second
    const sortedResponse = trimmedResponse.sort((currentResponse, nextResponse) => {
        if (nextResponse.payloads_count === currentResponse.payloads_count) {
            return nextResponse.launch_date_utc.localeCompare(currentResponse.launch_date_utc)
        }
        return nextResponse.payloads_count - currentResponse.payloads_count
    })

    return sortedResponse.map((response) => {
        return {
            flight_number: response.flight_number,
            mission_name: response.mission_name,
            payloads_count: response.payloads_count,
        }
    })
}

const renderData = (data) => {
    document.getElementById('out').innerText = JSON.stringify(data, null, 2)
    return data
}

module.exports = {
    prepareData,
    renderData
}