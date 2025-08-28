document.addEventListener("DOMContentLoaded", test)

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

function test() {
	/**
	 * @type HTMLDivElement
	 */
	const container = document.querySelector('.test')
	const halfWidth = container.offsetWidth / 2
	const halfHeight = container.offsetHeight / 2

	const radius = 120
	const dtr = Math.PI / 180
	const d = 300
	const tspeed = 3
	const size = 250

	/**
 * @type {Map<HTMLAnchorElement, {
 * cx: number | undefined,
 * cy: number | undefined,
 * cz: number | undefined,
 * alpha: number | undefined,
 * }>}
 */
	const items = new Map()

	container.querySelectorAll('a').forEach(link => {
		const cx = randInt(-radius, radius)
		const cy = randInt(-radius, radius)
		const cz = randInt(-radius, radius)

		items.set(link, {
			cz,
			cx,
			cy,
		})

		link.style.setProperty("--cx", cx)
		link.style.setProperty("--cy", cy)
	})

	let mouseX = 0
	let mouseY = 0
	let isActive = false
	let lastVDelta = 1
	let lastHDelta = 1

	container.style.setProperty("--container-half-width", `${halfWidth}px`)
	container.style.setProperty("--container-half-height", `${halfHeight}px`)

	container.addEventListener("mouseover", () => {
		isActive = true
	})

	container.addEventListener("mouseout", () => {
		isActive = false
	})

	container.addEventListener("mousemove", event => {
		mouseX = (event.clientX - (container.offsetLeft + halfWidth)) / 5
		mouseY = (event.clientY - (container.offsetTop + halfHeight)) / 5
	})

	update()

	function update() {
		let vDelta
		let hDelta

		if (isActive) {
			vDelta = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed
			hDelta = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed
		} else {
			vDelta = lastVDelta * 0.98
			hDelta = lastHDelta * 0.98
		}

		if (Math.abs(vDelta) <= 0.01 && Math.abs(hDelta) <= 0.01) {
			requestAnimationFrame(update)
			return
		}

		lastVDelta = vDelta
		lastHDelta = hDelta

		const { ca, cb, cc, sa, sb, sc } = sineCosine(vDelta, hDelta, 0)

		items.entries().toArray().sort((vItem1, vItem2) => {
			if (vItem1[1].cz > vItem2[1].cz) {
				return -1
			} else if (vItem1[1].cz < vItem2[1].cz) {
				return 1
			} else {
				return 0
			}
		}).forEach(([link, size], index) => {
			const rx1 = size.cx
			const ry1 = size.cy * ca + size.cz * (-sa)
			const rz1 = size.cy * sa + size.cz * ca

			const rx2 = rx1 * cb + rz1 * sb
			const ry2 = ry1
			const rz2 = rx1 * (-sb) + rz1 * cb

			const rx3 = rx2 * cc + ry2 * (-sc)
			const ry3 = rx2 * sc + ry2 * cc
			const rz3 = rz2

			const per = d / (d + rz3)

			size.cx = rx3
			size.cy = ry3
			size.cz = rz3

			link.style.setProperty("--z-index", index)
			link.style.setProperty("--cx", rx3)
			link.style.setProperty("--cy", ry3)
			link.style.setProperty("--opacity", Math.max(0.5, Math.min((per - 0.6) * (10 / 6), 1)))
		})

		requestAnimationFrame(update)
	}

	function sineCosine(a, b, c) {
		return {
			sa: Math.sin(a * dtr),
			ca: Math.cos(a * dtr),
			sb: Math.sin(b * dtr),
			cb: Math.cos(b * dtr),
			sc: Math.sin(c * dtr),
			cc: Math.cos(c * dtr)
		}
	}
}