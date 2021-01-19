import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import TopicLoader from '../../conversations/TopicLoader'

export default class LoadingTopicsFromDiskTest extends AbstractSpruceTest {
	@test()
	protected static async canCreateTopicLoader() {
		const loader = new TopicLoader()
		assert.isTruthy(loader)
	}

	@test()
	protected static async loadsNoTopicsWithBadDir() {
		const source = this.resolvePath('doesNotExist')
		const topics = await TopicLoader.Loader(source)

		assert.isLength(topics, 0)
	}

	@test()
	protected static async throwsWhenLoadingEmpty() {
		const source = this.resolveTestPath('bad-empty')

		const err = await assert.doesThrowAsync(() => TopicLoader.Loader(source))

		errorAssertUtil.assertError(err, 'INVALID_TOPIC', {
			topicScript: 'bookAppointment.topic',
		})
	}

	@test()
	protected static async throwsWhenMissingParameters() {
		const source = this.resolveTestPath('bad-missing-params')
		const err = await assert.doesThrowAsync(() => TopicLoader.Loader(source))

		errorAssertUtil.assertError(err, 'INVALID_TOPIC', {
			topicScript: 'bookAppointment.topic',
		})

		//@ts-ignore
		const original = err.options.originalError

		errorAssertUtil.assertError(original, 'MISSING_PARAMETERS', {
			parameters: ['label', 'utterances', 'script'],
		})
	}

	@test()
	protected static async canLoadTopics() {
		const scripts = await TopicLoader.Loader(this.resolveTestPath('good'))
		assert.isLength(scripts, 2)
	}

	@test()
	protected static async loadedTopicsSetKey() {
		const scripts = await TopicLoader.Loader(this.resolveTestPath('good'))
		assert.doesInclude(scripts, { key: 'bookAppointment' })
		assert.doesInclude(scripts, { key: 'cancelAppointment' })
	}

	private static resolveTestPath(pathAfterTestDirsAndFiles: string) {
		return this.resolvePath(
			__dirname,
			'..',
			'testDirsAndFiles',
			pathAfterTestDirsAndFiles
		)
	}
}
