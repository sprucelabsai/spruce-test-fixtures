import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import PersonFixture from './PersonFixture'

export class SkillFixture {
	private personFixture: PersonFixture

	public constructor(personFixture: PersonFixture) {
		this.personFixture = personFixture
	}

	public async seedDemoSkill(values: { name: string; slug?: string }) {
		const { client } = await this.personFixture.loginAsDemoPerson()

		const results = await client.emit('register-skill::v2020_12_25', {
			payload: {
				slug: `my-skill-${new Date().getTime()}`,
				...values,
			},
		})

		const { skill } = eventResponseUtil.getFirstResponseOrThrow(results)

		return skill
	}

	public async destory() {
		await this.personFixture.destroy()
	}
}
