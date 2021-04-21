export let clearStorage = () => {
    document.cookie = "drift_aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "driftt_aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "drift_eid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "driftt_eid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "drift_campaign_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "driftt_sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "driftt_wmd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "DFTT_END_USER_PREV_BOOTSTRAPPED=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "DFTT_LEAD_HAS_PREV_IDENTIFIED=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    sessionStorage.clear();
}

export let getScreenshot = (url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        // Token domain-verified to prevent abuse since this is in the JS
        request.open('GET', `https://api.apiflash.com/v1/urltoimage?access_key=50c864cc62ee4df69a23f65c15eea431&response_type=json&url=${url}&height=820&width=1440&js=document.getElementById%28%27hs-eu-confirmation-button%27%29.click%28%29%3B`, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(JSON.parse(request.response));
            } else {
                reject(JSON.parse(request.response));
            }
        };
        request.onerror = () => {
            reject(JSON.parse(request.response));
        };
        request.send();
    });
};

export let openSettings = () => {
    $('.settings').show();
    $('.container').addClass('blur');
}

export let closeSettings = () => {
    $('.settings').hide();
    $('.blur').removeClass('blur');
}

$(function () {
    clearStorage();
    let settingsOpen = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('url');
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const companyName = urlParams.get('companyName');
    const title = urlParams.get('title');
    const email = urlParams.get('email');
    let campaignID = urlParams.get('campaignID');
    let driftID = urlParams.get('driftID');
    const overrideUrl = urlParams.get('overrideUrl');
    const botColor = urlParams.get('botColor');

    $('.settingsToggle').click(function () {
        if (settingsOpen) {
            closeSettings();
            settingsOpen = false;
        } else {
            openSettings();
            settingsOpen = true;
        }
    });

    if (driftID) {
        $('#idInput').val(driftID);
    } else {
        driftID = 'bra3fivwpda4';
    }

    if (campaignID) {
        $('#campaignInput').val(campaignID);
    } else {
        campaignID = '2289492';
    }

    if (firstName) {
        $('#firstNameInput').val(firstName);
    }

    if (lastName) {
        $('#lastNameInput').val(lastName);
    }

    if (email) {
        $('#emailInput').val(email);
    }

    if (companyName) {
        $('#companyInput').val(companyName);
    }

    if (title) {
        $('#titleInput').val(title);
    }

    if (botColor) {
        $('#botColorInput').val('#' + botColor);
        document.documentElement.style.setProperty('--botColor', '#' + botColor);
    }

    if (url) {
        $('#urlInput').val(url);
        if (!overrideUrl) {
            getScreenshot(url).then(screenshotData => {
                $('#img').attr('src', screenshotData.url);
            }).catch(error => {
                console.warn('Error: ', error);
            });
        }
    }

    if (overrideUrl) {
        $('#overrideUrlInput').val(overrideUrl);
        $('#img').attr('src', overrideUrl);
    }


    $('#generate').click(function () {
        let urlArray = [];
        if ($('#urlInput').val()) {
            urlArray.push('url=' + $('#urlInput').val());
        }
        if ($('#overrideUrlInput').val()) {
            urlArray.push('overrideUrl=' + $('#overrideUrlInput').val());
        }
        if ($('#firstNameInput').val()) {
            urlArray.push('firstName=' + $('#firstNameInput').val());
        }
        if ($('#lastNameInput').val()) {
            urlArray.push('lastName=' + $('#lastNameInput').val());
        }
        if ($('#titleInput').val()) {
            urlArray.push('title=' + $('#titleInput').val());
        }
        if ($('#companyInput').val()) {
            urlArray.push('companyName=' + $('#companyInput').val());
        }
        if ($('#emailInput').val()) {
            urlArray.push('email=' + $('#emailInput').val());
        }
        if ($('#botColorInput').val()) {
            urlArray.push('botColor=' + $('#botColorInput').val().substr(1));
        }
        if ($('#campaignInput').val()) {
            urlArray.push('campaignID=' + $('#campaignInput').val());
        }
        if ($('#idInput').val()) {
            urlArray.push('driftID=' + $('#idInput').val());
        }
        if (urlArray.length < 1) {
            window.location.href = window.location.origin + window.location.pathname;
        } else {
            let urlString = window.location.origin + window.location.pathname + '?';
            $.each(urlArray, function (index, value) {
                if (index) {
                    urlString += "&";
                }
                urlString += value;
            })
            window.location.href = urlString;
        }
    });
});
