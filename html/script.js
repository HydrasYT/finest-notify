// when multiple of the same notifications are made, it deletes the old one and counts up the new one
// false = disabled
// true = enabled
// will be ignored if also declared within config.lua
let counter = true;
const COUNTER_ATTR_NAME = 'data-amount'; // DO NOT CHANGE!

/*
	action = 'notify',
	type = ttype or 'primary',
	duration = length,
	text = text,
	caption = capt,
*/

/**
 * @param {HTMLElement} elm
 * @param {string} classList
 */
function $c(elm, classList = '') {
	const e = document.createElement(elm);
	e.className = classList;
	return e;
}
const cont = document.querySelector('#notif-container');

/*
	<div class="notif active">
		<h3><span class="fa-regular fa-circle"></span>hi</h3>
		<p>Hello</p>
	</div>
	background-color: #48abe0;
	box-shadow: 0 0px 25px 0px #48abe0;
*/

/**
 * @param {HTMLElement} elm
 */
function remove(elm) {
	elm.classList.remove('active');
	setTimeout(() => elm.remove(), (parseFloat(getComputedStyle(elm).transitionDuration) * 1000) / 1.333333333);
}
/**
 * @param {HTMLElement} elm
 * @param {number} duration
 * @param {Function?} cb
 */
function setupForRemoval(elm, duration, cb) {
	setTimeout(() => {
		if (elm.parentNode) {
			remove(elm);
			if (cb && typeof cb === 'function') cb();
		}
	}, duration);
}

function ShowNotification(icon, color, duration, text, caption) {
	let notif = $c('div', 'notif');
	notif.style.backgroundColor = color;
	notif.style.boxShadow = '0 0 1.563rem 0px ' + color;

	if (counter) {
		const notifExists = NotifExists(icon, notif.style.backgroundColor, text, caption);
		if (notifExists && cont.firstElementChild !== notifExists) {
			notif.setAttribute(COUNTER_ATTR_NAME, Math.min(notifExists.hasAttribute(COUNTER_ATTR_NAME) ? parseInt(notifExists.getAttribute(COUNTER_ATTR_NAME)) + 1 : 2, 99));
			remove(notifExists);
		} else if (notifExists && cont.firstElementChild === notifExists) {
			notifExists.setAttribute(COUNTER_ATTR_NAME, Math.min(notifExists.hasAttribute(COUNTER_ATTR_NAME) ? parseInt(notifExists.getAttribute(COUNTER_ATTR_NAME)) + 1 : 2, 99));
			return notifExists;
		}
	}

	if (cont.childElementCount >= 4) {
		if (cont.lastElementChild) {
			remove(cont.lastElementChild);
		}
	}

	let h3 = $c('h3');
	if (icon) {
		let ic = $c('span', icon);
		h3.appendChild(ic);
	}
	h3.append(caption);
	notif.appendChild(h3);

	let p = $c('p');
	p.textContent = text;

	notif.appendChild(p);

	cont.prepend(notif);
	setTimeout(() => notif.classList.add('active'), 15);

	if (duration !== Infinity && duration >= 0) setupForRemoval(notif, duration <= 0 ? 1000 : duration);

	notif.addEventListener('click', (_e) => {
		remove(notif);
	});

	return notif;
}

/** @returns {HTMLElement?} */
function NotifExists(icon, color, text, caption) {
	let res = null;
	Array.from(cont.querySelectorAll('.notif.active')).some((notif) => {
		if (!notif.style.backgroundColor.includes(color)) return;
		const head = notif.querySelector('h3');
		const iicon = head.querySelector('span');
		if ((icon && !iicon) || (!icon && iicon)) return;
		if (icon && iicon.className !== icon) return;
		if (head.innerText.toLowerCase() !== caption.toLowerCase()) return;
		if (notif.querySelector('p').innerText.toLowerCase() !== text.toLowerCase()) return;
		res = notif;
		return true;
	});
	return res;
}

window.addEventListener('message', ({ data }) => {
	if (data.action === 'fnotify') {
		if (data.counter != null) counter = data.counter;
		ShowNotification(data.icon, data.type, data.duration, data.text, data.caption);
	}
});
