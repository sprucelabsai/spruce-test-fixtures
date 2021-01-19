import { MercuryClient } from '@sprucelabs/mercury-client'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'

require('dotenv').config()

export type ApiClientFactory = () => Promise<MercuryClient<any>>

export default class PersonFixture<
	Factory extends ApiClientFactory = ApiClientFactory
> {
	private apiClientFactory: Factory

	public constructor(apiClientFactory: Factory) {
		this.apiClientFactory = apiClientFactory
	}

	public async loginAsDemoPerson(phone: string) {
		const client = await this.apiClientFactory()

		//@ts-ignore
		if (client.auth?.person?.phone === phone) {
			return client
		}

		const requestPinResults = await client.emit('request-pin::v2020_12_25', {
			payload: { phone },
		})

		const { challenge } = eventResponseUtil.getFirstResponseOrThrow(
			requestPinResults
		)

		const confirmPinResults = await client.emit('confirm-pin::v2020_12_25', {
			payload: { challenge, pin: phone.substr(-4) },
		})

		const { person } = eventResponseUtil.getFirstResponseOrThrow(
			confirmPinResults
		)

		//@ts-ignore
		client.auth = { person }

		return { person, client }
	}
}
