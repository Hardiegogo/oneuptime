process.env.PORT = 3020;
const expect = require('chai').expect;
const userData = require('./data/user');
const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-subset'));
const app = require('../server');
const GlobalConfig = require('./utils/globalConfig');
const request = chai.request.agent(app);
const { createUser } = require('./utils/userSignUp');
const VerificationTokenModel = require('../backend/models/verificationToken');

// eslint-disable-next-line no-unused-vars
let token, userId, projectId, componentId, errorTracker;

describe('Application Log API', function() {
    this.timeout(80000);

    // eslint-disable-next-line no-undef
    before(function(done) {
        this.timeout(90000);
        GlobalConfig.initTestConfig().then(function() {
            createUser(request, userData.user, function(err, res) {
                const project = res.body.project;
                projectId = project._id;
                userId = res.body.id;

                VerificationTokenModel.findOne({ userId }, function(
                    err,
                    verificationToken
                ) {
                    request
                        .get(`/user/confirmation/${verificationToken.token}`)
                        .redirects(0)
                        .end(function() {
                            request
                                .post('/user/login')
                                .send({
                                    email: userData.user.email,
                                    password: userData.user.password,
                                })
                                .end(function(err, res) {
                                    token = res.body.tokens.jwtAccessToken;
                                    const authorization = `Basic ${token}`;
                                    request
                                        .post(`/component/${projectId}`)
                                        .set('Authorization', authorization)
                                        .send({
                                            name: 'New Component',
                                        })
                                        .end(function(err, res) {
                                            componentId = res.body._id;
                                            expect(res).to.have.status(200);
                                            expect(res.body.name).to.be.equal(
                                                'New Component'
                                            );
                                            done();
                                        });
                                });
                        });
                });
            });
        });
    });

    it('should reject the request of an unauthenticated user', function(done) {
        request
            .post(`/error-tracker/${projectId}/${componentId}/create`)
            .send({
                name: 'New Error Tracker',
            })
            .end(function(err, res) {
                expect(res).to.have.status(401);
                done();
            });
    });
    it('should reject the request of an empty error tracker name', function(done) {
        const authorization = `Basic ${token}`;
        request
            .post(`/error-tracker/${projectId}/${componentId}/create`)
            .set('Authorization', authorization)
            .send({
                name: null,
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('should create ann error tracker', function(done) {
        const authorization = `Basic ${token}`;
        request
            .post(`/error-tracker/${projectId}/${componentId}/create`)
            .set('Authorization', authorization)
            .send({
                name: 'Node Project',
            })
            .end(function(err, res) {
                errorTracker = res.body;
                expect(res).to.have.status(200);
                expect(res.body).to.include({ name: 'Node Project' });
                done();
            });
    });
    it('should return a list of error trackers under component', function(done) {
        const authorization = `Basic ${token}`;
        request
            .get(`/error-tracker/${projectId}/${componentId}`)
            .set('Authorization', authorization)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('should not return a list of error trackers under wrong component', function(done) {
        const authorization = `Basic ${token}`;
        request
            .get(`/error-tracker/${projectId}/5ee8d7cc8701d678901ab908`) // wrong component ID
            .set('Authorization', authorization)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal(
                    'Component does not exist.'
                );
                done();
            });
    });
});
