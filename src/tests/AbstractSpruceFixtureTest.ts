import AbstractSpruceTest from '@sprucelabs/test'
import FixtureFactory from '../fixtures/FixtureFactory'
import { FixtureName } from '../types/fixture.types'

export default abstract class AbstractSpruceFixtureTest extends AbstractSpruceTest {
	protected static async afterEach() {
		await super.afterEach()
		await FixtureFactory.destroy()
	}

	protected static Fixture<Name extends FixtureName>(name: Name) {
		return FixtureFactory.Fixture(name)
	}
}
