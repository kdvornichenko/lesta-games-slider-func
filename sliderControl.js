window.addEventListener('DOMContentLoaded', () => {
	const data = {
		ussr: {
			title: 'ссср',
			count: '141',
			models: 'Т-34, ИС, ИС-7, КВ-1, ИСУ-152',
		},
		germany: {
			title: 'германия',
			count: '127',
			models: 'StuG III, Panther, Maus, Tiger, Pz. III',
		},
		usa: {
			title: 'сша',
			count: '109',
			models: 'Sherman, Pershing, Patton, T32, Hellcat',
		},
		france: {
			title: 'франция',
			count: '78',
			models: 'AMX 13 75, AMX 30 B, Bat.-Châtillon 25 t, Lorraine 40 t, Foch B',
		},
		uk: {
			title: 'британия',
			count: '95',
			models:
				'Churchill VII, Centurion Mk. I, Super Conqueror, Tortoise, FV304',
		},
		czech: {
			title: 'чехословакия',
			count: '19',
			models:
				'Škoda T 25, Konštrukta T-34/100, TVP T 50/51, TVP VTU Koncept, LT vz. 38',
		},
	}

	const nav = document.querySelector('.nav')
	const navItem = nav.querySelectorAll('.nav_item')

	const navArrowNext = document.querySelector('.nav_arrow__next')
	const navArrowPrev = document.querySelector('.nav_arrow__prev')

	const technic = document.querySelector('.technic')
	const bigFlag = technic.querySelector('.technic_flag')
	const technicBg = technic.querySelector('.technic_pic')
	const title = technic.querySelector('.technic_title')
	const count = technic.querySelector('.technic_count')
	const countSubtext = technic.querySelector('.technic_count-subtext')
	const models = technic.querySelector('.technic_text')

	navArrowNext.addEventListener('click', () => {
		onArrowClick('next')
	})
	navArrowPrev.addEventListener('click', () => {
		onArrowClick('prev')
	})

	function onArrowClick(arrow) {
		const activeItem = document.querySelector('.nav_item__active')

		if (arrow === 'next') {
			activeItem.nextElementSibling
				? activeItem.nextElementSibling.click()
				: nav.firstChild.nextSibling.click()
		}
		if (arrow === 'prev') {
			activeItem.previousElementSibling
				? activeItem.previousElementSibling.click()
				: nav.lastChild.previousSibling.click()
		}
	}

	function isNavItemActive() {
		for (let i = 0; i < navItem.length; i++) {
			navItem[i].classList.contains('nav_item__active')
				? navItem[i].classList.remove('nav_item__active')
				: null
		}
	}

	function setTechnicAndFlag(dataFlag) {
		const technicPicHolder = document.querySelector('.technic_pic-holder')
		if (window.screen.width < 769) {
			technicPicHolder.style.backgroundImage = `url(./img/technic-${dataFlag}.png)`
		}

		technicBg.setAttribute('src', `./img/technic-${dataFlag}.png`)
		technicBg.previousElementSibling.setAttribute(
			'srcset',
			`./img/technic-${dataFlag}.webp`
		)

		bigFlag.style.backgroundImage = `url(./img/flags/${dataFlag}.webp)`
	}

	function setCountSubtext(country, dataFlag) {
		countSubtext.innerHTML = `${country} машин${
			dataFlag == 'ussr' ? 'а' : ''
		} в игре`
	}

	function setTechnicVisibility(setParams) {
		technic.style.opacity = '0'

		setTimeout(() => {
			technic.style.opacity = '1'
			setParams()
		}, 300)
	}

	// Меняем данные при клике
	navItem.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('nav_item__active')) {
				return
			}

			const dataFlag = item.dataset.flag
			const currentFlag = data[dataFlag]

			setTechnicVisibility(setParams)

			function setParams() {
				currentFlag.title == 'чехословакия'
					? title.classList.add('technic_title__small')
					: title.classList.remove('technic_title__small')

				title.innerText = currentFlag.title
				count.innerText = currentFlag.count
				models.innerText = currentFlag.models

				switch (dataFlag) {
					case 'ussr':
						setCountSubtext('советская', count)
						setTechnicAndFlag(dataFlag)
						break

					case 'germany':
						setCountSubtext('немецких', count)
						setTechnicAndFlag(dataFlag)
						break

					case 'usa':
						setCountSubtext('американских', count)
						setTechnicAndFlag(dataFlag)
						break

					case 'france':
						setCountSubtext('французских', count)
						setTechnicAndFlag(dataFlag)
						break

					case 'uk':
						setCountSubtext('британских', count)
						setTechnicAndFlag(dataFlag)
						break

					case 'czech':
						setCountSubtext('чехословацких', count)
						setTechnicAndFlag(dataFlag)
						break

					default:
						setCountSubtext('советская', count)
						setTechnicAndFlag(dataFlag)
						break
				}
			}

			isNavItemActive()

			item.classList.add('nav_item__active')
		})
	})
})
