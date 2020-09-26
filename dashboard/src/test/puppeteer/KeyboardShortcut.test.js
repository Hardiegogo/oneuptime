const puppeteer = require('puppeteer');
const utils = require('./test-utils');
const init = require('./test-init');
const { Cluster } = require('puppeteer-cluster');

require('should');

// user credentials
const email = utils.generateRandomBusinessEmail();
const password = '1234567890';

describe('Keyboard Shortcut: Dashboard', () => {
    const operationTimeOut = 500000;

    let cluster;
    beforeAll(async done => {
        jest.setTimeout(360000);

        cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_PAGE,
            puppeteerOptions: utils.puppeteerLaunchConfig,
            puppeteer,
            timeout: 500000,
        });

        cluster.on('error', err => {
            throw err;
        });

        await cluster.execute({ email, password }, async ({ page, data }) => {
            const user = {
                email: data.email,
                password: data.password,
            };
            // user
            await init.registerUser(user, page);
            await init.loginUser(user, page);
        });

        done();
    });

    afterAll(async done => {
        await cluster.idle();
        await cluster.close();
        done();
    });

    test(
        'should navigate to component pages with keyboard shortcut (f + c)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#components', { visible: true });
                await page.keyboard.press('f');
                await page.keyboard.press('c');
                const componentForm = await page.waitForSelector(
                    '#form-new-component',
                    { visible: true }
                );
                expect(componentForm).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to status pages with keyboard shortcut (f + u)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#statusPages', { visible: true });
                await page.keyboard.press('f');
                await page.keyboard.press('u');
                const statusPageTable = await page.waitForSelector(
                    '#statusPageTable',
                    { visible: true }
                );
                expect(statusPageTable).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to on-call schedule page with keyboard shortcut (f + o)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#onCallSchedules', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('o');
                const onCall = await page.waitForSelector(
                    '#onCallSchedulePage',
                    { visible: true }
                );
                expect(onCall).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should naviage to alert log page with keyboard shortcut (f + a)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#onCallSchedules', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('a');
                const alertLog = await page.waitForSelector('#alertLogPage', {
                    visible: true,
                });
                expect(alertLog).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to reports page with keyboard shortcut (f + r)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#reports', { visible: true });
                await page.keyboard.press('f');
                await page.keyboard.press('r');
                const report = await page.waitForSelector('#reportPage', {
                    visible: true,
                });
                expect(report).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to team members page with keyboard shortcut (f + t)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#teamMembers', { visible: true });
                await page.keyboard.press('f');
                await page.keyboard.press('t');
                const teamMember = await page.waitForSelector(
                    '#teamMemberPage',
                    { visible: true }
                );
                expect(teamMember).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to project settings page with keyboard shortcut (f + p)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('p');
                const projectSettings = await page.waitForSelector(
                    '#settingsPage',
                    { visible: true }
                );
                expect(projectSettings).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to billing settings page with keyboard shortcut (f + b)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('b');
                const billing = await page.waitForSelector('#billingSetting', {
                    visible: true,
                });
                expect(billing).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to resource category page with keyboard shortcut (f + m)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('m');
                const resourceCategory = await page.waitForSelector(
                    '#resourceCategories',
                    { visible: true }
                );
                expect(resourceCategory).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to integrations page with keyboard shortcut (f + i)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('i');
                const zapier = await page.waitForSelector('#zapierId', {
                    visible: true,
                });
                expect(zapier).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to email setttings page with keyboard shortcut (f + e)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('e');
                const emailTemplate = await page.waitForSelector(
                    '#emailTemplate',
                    { visible: true }
                );
                expect(emailTemplate).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to sms settings page with keyboard shortcut (f + s)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('s');
                const smsTemplate = await page.waitForSelector('#smsTemplate', {
                    visible: true,
                });
                expect(smsTemplate).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to probe in settings page with keyboard shortcut (f + x)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('x');
                const probe = await page.waitForSelector('#probeList', {
                    visible: true,
                });
                expect(probe).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to git credential page with keyboard shortcut (f + g)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('g');
                const gitCredential = await page.waitForSelector(
                    '#gitCredentialPage',
                    { visible: true }
                );
                expect(gitCredential).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to docker credential page with keyboard shortcut (f + d)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('d');
                const dockerCredential = await page.waitForSelector(
                    '#dockerCredentialPage',
                    { visible: true }
                );
                expect(dockerCredential).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to api page with keyboard shortcut (f + w)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#projectSettings', {
                    visible: true,
                });
                await page.keyboard.press('f');
                await page.keyboard.press('w');
                const fyipeApi = await page.waitForSelector('#fyipeApi', {
                    visible: true,
                });
                expect(fyipeApi).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to profile settings with keyboard shortcut (p + s)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#profile-menu', { visible: true });
                await page.click('#profile-menu');
                await page.waitForSelector('#profileBilling');
                await page.click('#profileBilling');
                await page.waitForSelector('#profileSettings', {
                    visible: true,
                });

                await page.keyboard.press('p');
                await page.keyboard.press('s');
                const profileSetting = await page.waitForSelector(
                    '#profileSettingPage',
                    { visible: true }
                );
                expect(profileSetting).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to change password page with keyboard shortcut (p + c)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#profile-menu', { visible: true });
                await page.click('#profile-menu');
                await page.waitForSelector('#userProfile');
                await page.click('#userProfile');
                await page.waitForSelector('#changePassword', {
                    visible: true,
                });

                await page.keyboard.press('p');
                await page.keyboard.press('c');
                const changePassword = await page.waitForSelector(
                    '#changePasswordSetting',
                    { visible: true }
                );
                expect(changePassword).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to profile billing page with keyboard shortcut (p + b)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#profile-menu', { visible: true });
                await page.click('#profile-menu');
                await page.waitForSelector('#userProfile');
                await page.click('#userProfile');
                await page.waitForSelector('#billing', { visible: true });

                await page.keyboard.press('p');
                await page.keyboard.press('b');
                const profileBilling = await page.waitForSelector(
                    '#profileBilling',
                    { visible: true }
                );
                expect(profileBilling).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate to advanced page with keyboard shortcut (p + a)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#profile-menu', { visible: true });
                await page.click('#profile-menu');
                await page.waitForSelector('#userProfile');
                await page.click('#userProfile');
                await page.waitForSelector('#advanced', { visible: true });

                await page.keyboard.press('p');
                await page.keyboard.press('a');
                const deleteBtn = await page.waitForSelector(
                    '#btn_delete_account',
                    { visible: true }
                );
                expect(deleteBtn).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );

    test(
        'should navigate back to dashboard from profile using keyboard shortcut (p + d)',
        async done => {
            await cluster.execute(null, async ({ page }) => {
                await page.goto(utils.DASHBOARD_URL);
                await page.waitForSelector('#profile-menu', { visible: true });
                await page.click('#profile-menu');
                await page.waitForSelector('#userProfile');
                await page.click('#userProfile');
                await page.waitForSelector('#backToDashboard', {
                    visible: true,
                });

                await page.keyboard.press('p');
                await page.keyboard.press('d');
                const component = await page.waitForSelector('#components', {
                    visible: true,
                });
                expect(component).toBeDefined();
            });
            done();
        },
        operationTimeOut
    );
});
