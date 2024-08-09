import 'dotenv/config';
import { expect } from 'chai';
import express, { Express } from 'express';
import { agent as request } from 'supertest';
import * as loaders from '../src/loaders';
import { Period } from '../src/modules/football/interfaces/stats.interface';
import { AUTH_HEADER_NAME, DEFAULT_API_PASSWORD } from '../src/shared/constants';

let app: Express;

describe('Testing the app', () => {
    it('should load the app', async () => {
        app = express();
        await loaders.init(app);

        const res = await request(app)
            .get('/');
        expect(res.status).to.equal(200);
    });

    it('undefined endpoint', async () => {
        const res = await request(app)
            .get('/undefinedEndpoint');
        expect(res.status).to.equal(404);
        expect(res.body.message).equal('Endpoint Not Found');
    });

});

describe('GET /v1/stats/:period', () => {

    describe('[Season Stats]', () => {
        const period = Period.SEASON;

        it('unauthorized access', (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .expect('Content-Type', /json/)
                .expect(401, done);
        });

        it('getting all season stats', (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('[Week Stats]', () => {
        const period = Period.WEEK;
        const validWeekId = 1;
        const invalidWeekId = 30;

        it("weekId validation query param when period = 'week'", (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(422, done);
        });

        it("valid weekId value when period = 'week'", (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .query({ 'weekId': invalidWeekId })
                .expect('Content-Type', /json/)
                .expect(422, done);
        });

        it(`get weeek stats for weekId='${validWeekId}' when period = 'week'`, async () => {
            const res = await request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .query({ 'weekId': validWeekId })
                .expect('Content-Type', /json/);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body.period).equal(period);
            expect(res.body.stats[0]).to.be.an("object");
            expect(res.body.stats[0].id).to.be.an("number");
        });
    });


    describe('[Month Stats]', () => {
        const period = Period.MONTH;
        const validMonthId = 10;
        const invalidMonthId = 1;

        it("monthId validation query param when period = 'month'", (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .expect('Content-Type', /json/)
                .expect(422, done);
        });

        it("valid monthId value when period = 'month'", (done) => {
            request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .query({ 'monthId': invalidMonthId })
                .expect('Content-Type', /json/)
                .expect(422, done);
        });

        it(`get month stats for monthId=${validMonthId} when period = 'month'`, async () => {
            const res = await request(app)
                .get(`/v1/stats/${period}`)
                .set(AUTH_HEADER_NAME, DEFAULT_API_PASSWORD)
                .query({ 'monthId': validMonthId })
                .expect('Content-Type', /json/);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body.period).equal(period);
            expect(res.body.stats[0]).to.be.an("object");
            expect(res.body.stats[0].id).to.be.an("number");
        });
    });

});
