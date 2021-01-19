import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { MercuryFixture } from '../../fixtures/MercuryFixture'
import PersonFixture from '../../fixtures/PersonFixture'

export default class PersonFixtureTest extends AbstractSpruceTest {
	private static personFixture: PersonFixture

	protected static async beforeEach() {
		await super.beforeEach()

		const mercuryFixture = new MercuryFixture()
		const personFixture = new PersonFixture(
			mercuryFixture.getApiClientFactory()
		)

		this.personFixture = personFixture
	}

	@test()
	protected static async canCreatePersonFixture() {
		assert.isTruthy(this.personFixture)
	}

	@test()
	protected static async canLoginAsPerson() {
		const { person, client } = await this.personFixture.loginAsDemoPerson(
			'555-555-0001'
		)

		assert.isTruthy(person)
		assert.isTruthy(client)

		await client.disconnect()
	}
}
