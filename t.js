const webdriver = require('selenium-webdriver');
const delay = ms => new Promise(res => setTimeout(res, ms));

(async function example() {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    const url = 'https://www.codewars.com'

    await driver.get(url + '/users/sign_in');
    await delay(20000);

    const userTable = await driver.findElement(webdriver.By.className('leaderboard'))
    const userList = await userTable.findElements(webdriver.By.tagName('tr'))
    const promises = userList.map(e => e.getAttribute('data-username'))
    const usernames = await Promise.all(promises);

    while (usernames.length) {
        const username = usernames.pop()
        console.log(usernames.length, username)
        if (!username || username === 'volmk') continue

        await driver.navigate().to(url + '/users/' + username)
        await delay(1000);

        const unfollow = await driver.findElement(webdriver.By.id('toggle_relationship'))
        await unfollow.click()
    }
})();
