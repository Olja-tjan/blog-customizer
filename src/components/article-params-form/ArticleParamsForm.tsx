import { useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState(defaultArticleState);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClickButton={setIsOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Select
						selected={selected.fontFamilyOption}
						options={fontFamilyOptions}
						//placeholder?={ string}
						onChange={(e) => {
							setSelected({ ...selected, fontFamilyOption: e });
						}}
						//onClose?={ () => void}
						title='шрифт'
					/>
					<RadioGroup
						selected={selected.fontSizeOption}
						name='radio'
						onChange={(e) => {
							setSelected({ ...selected, fontSizeOption: e });
						}}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selected.fontColor}
						options={fontColors}
						//placeholder?={ string}
						onChange={(e) => {
							setSelected({ ...selected, fontColor: e });
						}}
						//onClose?={ () => void}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selected.backgroundColor}
						options={backgroundColors}
						//placeholder?={ string}
						onChange={(e) => {
							setSelected({ ...selected, backgroundColor: e });
						}}
						//onClose?={ () => void}
						title='цвет фона'
					/>
					<Select
						selected={selected.contentWidth}
						options={contentWidthArr}
						//placeholder?={ string}
						onChange={(e) => {
							setSelected({ ...selected, contentWidth: e });
						}}
						//onClose?={ () => void}
						title='ширина контекста'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
