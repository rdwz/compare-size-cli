import { execa } from 'execa'
import { describe, it, expect } from 'vitest'
import packageJson from './package.json'

describe('cli', () => {
	it('displays the correct help message', async () => {
		const { stdout } = await execa('./cli.js', ['--help'])
		expect(stdout).toMatchSnapshot('help-message')
	})

	it('displays the correct version', async () => {
		const { stdout } = await execa('./cli.js', ['--version'])
		expect(stdout).toBe(packageJson.version)
	})
})
