export let clearCookies = () => {
    document.cookie = "driftt_aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "driftt_sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "DFTT_END_USER_PREV_BOOTSTRAPPED=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

export let openNotification = (shouldBlur) => {
    $('.notification').css('transform', 'translateX(0%)');
    if (shouldBlur) {
        $('.container').addClass('blur');
    }
}

export let closeNotification = () => {
    $('.notification').css('transform', 'translateX(150%)');
    $('.blur').removeClass('blur');
}

$(function () {
    let settingsOpen = false;
    let notificationOpen = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get('url');
    const bots = urlParams.get('bots');
    let driftID = urlParams.get('driftID');
    const abm = urlParams.get('abm');
    const overrideUrl = urlParams.get('overrideUrl');
    const ai = urlParams.get('ai');
    const dual = urlParams.get('dual');
    const abmCompany = urlParams.get('abmCompany');
    const abmTitle = urlParams.get('abmTitle');
    const abmPage = urlParams.get('abmPage');
    const abmRep = urlParams.get('abmRep');
    const abmPhoto = urlParams.get('abmPhoto');
    const abmMessage = urlParams.get('abmMessage');
    const abmCTA = urlParams.get('abmCTA');
    const botColor = urlParams.get('botColor');
    clearCookies();

    $('.settingsToggle').click(function () {
        if (settingsOpen) {
            closeSettings();
            settingsOpen = false;
        } else {
            openSettings();
            settingsOpen = true;
        }
    });

    $('.notificationToggle').click(function () {
        if (notificationOpen) {
            closeNotification();
            notificationOpen = false;
        } else {
            openNotification(true);
            notificationOpen = true;
        }
    })

    $('.notification .close').click(function () {
        if (notificationOpen) {
            closeNotification();
            notificationOpen = false;
        }
    })

    if (driftID) {
        $('#idInput').val(driftID);
    } else {
        driftID = 'bra3fivwpda4';
    }

    let tagifyInput = document.querySelector('#botsInput');
    let tagify = new Tagify(tagifyInput, {
        whitelist: [
            'homeBot',
            'intelBot',
            'formBot',
            'adBot',
            'contentBot',
            'returnBot',
            'pricingBot',
            'demoBot',
            'eventBot',
            'listBot',
            'webinarBot',
            'industryBot'
        ],
        maxTags: 5
    });

    if (dual) {
        $('#dualInput').prop('checked', true);
        if (!$('.container').children().length) {
            $('.container').append(`
                <div class="frame stretch">
                    <iframe src="https://app.drift.com/inboxes" frameborder="0"></iframe>
                </div>
            `);
        } else {
            $('.container').append(`
                <div class="frame">
                    <iframe src="https://app.drift.com/inboxes" frameborder="0"></iframe>
                </div>
            `);
        }
    }

    if (bots) {
        try {
            const botsJSON = JSON.parse(bots);
            $.each(botsJSON, function (index, bot) {
                tagify.addTags(bot);
                if (!index) {
                    $('.container').append(`
                    <div class="frame bot stretch">
                        <iframe src="partials/bot.html?playbook=${bot}&driftID=${driftID}&abmCompany=${abmCompany}&abmTitle=${abmTitle}&botColor=${botColor}" frameborder="0"></iframe>
                    </div>
                `);
                } else {
                    $('.container').append(`
                     <div class="frame bot">
                        <iframe src="partials/bot.html?playbook=${bot}&driftID=${driftID}&abmCompany=${abmCompany}&abmTitle=${abmTitle}&botColor=${botColor}" frameborder="0"></iframe>
                    </div>
                `);
                }
            });
        } catch (e) {
            console.log(e)
        }
    } else {
        $('.container').append(`
            <div class="frame bot stretch">
                <iframe src="partials/bot.html?playbook=homeBot&driftID=${driftID}&abmCompany=${abmCompany}&abmTitle=${abmTitle}&botColor=${botColor}" frameborder="0"></iframe>
            </div>
             <div class="frame bot">
                <iframe src="partials/bot.html?playbook=intelBot&driftID=${driftID}&abmCompany=${abmCompany}&abmTitle=${abmTitle}&botColor=${botColor}" frameborder="0"></iframe>
            </div>
        `);
    }

    if (abm) {
        $('#abmInput').prop('checked', true);
        if (!$('.container').children().length) {
            $('.container').append(`
                <div class="frame abm stretch">
                    <div class="abmPlaybook">
                        <div class="abmTop">
                            <div class="abmHeader">
                                <div class="repPic">
                                    <img src="img/profile.png">
                                </div>
                                <div class="repName">Joshua Perk</div>
                                <div class="menuIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="5" viewBox="0 0 21 5">
                                        <g fill="currentColor" fill-rule="evenodd">
                                            <circle cx="18.5" cy="2.5" r="2.5"></circle>
                                            <circle cx="10.5" cy="2.5" r="2.5"></circle>
                                            <circle cx="2.5" cy="2.5" r="2.5"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div class="abmMessage">
                                <span style="font-weight: bold;">Hey, Slack! 👋🏼</span> We've worked with companies like Microsoft Teams to drive more leads and accelerate revenue. Would you like me to show you how?
                            </div>
                        </div>
                        <div class="abmBottom">Book a Meeting</div>
                    </div>
                </div>
            `);
        } else {
            $('.container').append(`
                <div class="frame abm">
                    <div class="abmPlaybook">
                        <div class="abmTop">
                            <div class="abmHeader">
                                <div class="repPic">
                                    <img src="img/profile.png">
                                </div>
                                <div class="repName">Joshua Perk</div>
                                <div class="menuIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="5" viewBox="0 0 21 5">
                                        <g fill="currentColor" fill-rule="evenodd">
                                            <circle cx="18.5" cy="2.5" r="2.5"></circle>
                                            <circle cx="10.5" cy="2.5" r="2.5"></circle>
                                            <circle cx="2.5" cy="2.5" r="2.5"></circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div class="abmMessage">
                                <span style="font-weight: bold;">Hey, Slack! 👋🏼</span> We've worked with companies like Microsoft Teams to drive more leads and accelerate revenue. Would you like me to show you how?
                            </div>
                        </div>
                        <div class="abmBottom">Book a Meeting</div>
                    </div>
                </div>
            `);
        }
    }

    if (abmRep) {
        $('#abmRepInput').val(abmRep);
        $('.repName').html(abmRep);
    }

    if (abmPhoto) {
        $('#abmPhotoInput').val(abmPhoto);
        $('.repPic img').attr("src", abmPhoto);
    }

    if (abmMessage) {
        $('#abmMessageInput').val(abmMessage);
        $('.abmMessage').html(abmMessage);
    }

    if (abmCTA) {
        $('#abmCTAInput').val(abmCTA);
        $('.abmBottom').html(abmCTA);
    }

    if (botColor) {
        $('#botColorInput').val('#' + botColor);
        document.documentElement.style.setProperty('--botColor', '#' + botColor);
    }

    $('.abm').hover(
        function() {
            openNotification(false);
            notificationOpen = true;
        }, function() {
            closeNotification(false);
            notificationOpen = false;
        }
    );

    if (url) {
        $('#urlInput').val(url);
        getScreenshot(url).then(screenshotData => {
            $('.frame.bot').css('background-image', `url('${screenshotData.url}')`);
            $('.frame.abm').css('background-image', `url('${screenshotData.url}')`);
        }).catch(error => {
            console.warn('Error: ', error);
        });
    }

    if (overrideUrl) {
        $('#overrideUrlInput').val(overrideUrl);
        $('.frame.bot').css('background-image', `url('${overrideUrl}')`);
        $('.frame.abm').css('background-image', `url('${overrideUrl}')`);
    }

    if (ai) {
        $('#aiInput').prop('checked', true);
        if (!$('.container').children().length) {
            $('.container').append(`
                <div class="frame ai stretch">
                    <iframe src="partials/ai.html#demo" frameborder="0"></iframe>
                </div>
            `);
        } else {
            $('.container').append(`
                <div class="frame ai">
                    <iframe src="partials/ai.html#demo" frameborder="0"></iframe>
                </div>
            `);
        }
    }

    if (abmCompany) {
        $('#abmCompanyInput').val(abmCompany);
        $('.abmCompany').html(abmCompany);
    }

    if (abmPage) {
        $('#abmPageInput').val(abmPage);
        $('.abmPage').html(abmPage);
    }

    if (abmTitle) {
        $('#abmTitleInput').val(abmTitle);
        $('.abmTitle').html(abmTitle);
    }

    $('.frame').hover(
        function() {
            $('.stretch').removeClass('stretch');
        }, function() {
            $('.frame:first').addClass('stretch');
        }
    );

    $('#generate').click(function () {
        let urlArray = [];
        if ($('#urlInput').val()) {
            urlArray.push('url=' + $('#urlInput').val());
        }
        if ($('#overrideUrlInput').val()) {
            urlArray.push('overrideUrl=' + $('#overrideUrlInput').val());
        }
        if ($('#botsInput').val()) {
            const botsJSON = JSON.parse($('#botsInput').val());
            let botsString = "[";
            $.each(botsJSON, function (index, bot) {
                if (index) {
                    botsString += ",";
                }
                botsString += "\"" + bot.value + "\"";
            });
            botsString += "]";
            urlArray.push('bots=' + encodeURI(botsString));
        }
        if ($('#dualInput').prop('checked')) {
            urlArray.push('dual=true');
        }
        if ($('#aiInput').prop('checked')) {
            urlArray.push('ai=true');
        }
        if ($('#abmInput').prop('checked')) {
            urlArray.push('abm=true');
        }
        if ($('#abmCompanyInput').val()) {
            urlArray.push('abmCompany=' + $('#abmCompanyInput').val());
        }
        if ($('#abmTitleInput').val()) {
            urlArray.push('abmTitle=' + $('#abmTitleInput').val());
        }
        if ($('#abmPageInput').val()) {
            urlArray.push('abmPage=' + $('#abmPageInput').val());
        }
        if ($('#abmRepInput').val()) {
            urlArray.push('abmRep=' + $('#abmRepInput').val());
        }
        if ($('#abmPhotoInput').val()) {
            urlArray.push('abmPhoto=' + encodeURIComponent($('#abmPhotoInput').val()));
        }
        if ($('#abmMessageInput').val()) {
            urlArray.push('abmMessage=' + $('#abmMessageInput').val());
        }
        if ($('#abmCTAInput').val()) {
            urlArray.push('abmCTA=' + $('#abmCTAInput').val());
        }
        if ($('#botColorInput').val()) {
            urlArray.push('botColor=' + $('#botColorInput').val().substr(1));
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
    })

});