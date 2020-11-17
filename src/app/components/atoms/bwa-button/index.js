/**
 * External dependencies
 */
import classNames from 'classnames';
import { snakeCase } from 'snake-case';
import omit from 'lodash/omit';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { addUtmParams, isExternalUrl, get } from "@app/functions";
import './style.scss';

const BWAButton = forwardRef((props, ref) => {
	let {className = '', href, rel, target} = props;

	// If link is external...
	if (isExternalUrl(href)) {

		// Add class
		className += ' is-external';

		// Automatically add UTM params, if the URL doesn't already contain them
		if (!href.includes('utm_')) {
			const anchorText = typeof props.children === 'string' ? props.children : '';
			href = addUtmParams(
				href,
				{
					utm_term: get(['utmTerm'], props, anchorText),
					utm_content: get(['utmContent'], props, snakeCase(anchorText)),
					utm_campaign: get(['utmCampaign'], props),
				}
			);
		}

		// Ensure that rel attribute is set
		if (!rel) {
			rel = 'noreferrer noopener';
		}

		if (!target) {
			target = '_blank';
		}

	}

	return (
		<Button
			{ ...omit(props, ['utmCampaign', 'utmContent', 'utmTerm']) }
			className={ classNames({
				bluehost: true,
				[className]: className.length,
			}) }
			href={ href }
			ref={ ref }
			rel={ rel }
			target={ target }
		/>
	);
});

export default BWAButton;
