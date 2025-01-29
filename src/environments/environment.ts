import { LoginGatewayFakerService } from '../app/infra/gateways/login/login-gateway-faker.service';

export const environment = {
	production: true,
	title: 'Contrak',
	host: 'contrak',
	token: {
		// lifespan (miliseconds) (1 day)
		lifespan: 60 * 60 * 24 * 1000,
		// re-process token interval (miliseconds) (5 min)
		interval: 5 * 60 * 1000,
	},
	loginGateway: LoginGatewayFakerService,
};
