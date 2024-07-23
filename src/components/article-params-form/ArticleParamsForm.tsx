import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';

type TArticleParamsForm = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleChangeSelect = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelected({ ...selected, [key]: value });
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selected);
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setSelected(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClickButton={setIsOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Select
						selected={selected.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option: OptionType) => {
							handleChangeSelect('fontFamilyOption', option);
						}}
						title='шрифт'
					/>
					<RadioGroup
						selected={selected.fontSizeOption}
						name='radio'
						onChange={(option: OptionType) => {
							handleChangeSelect('fontSizeOption', option);
						}}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selected.fontColor}
						options={fontColors}
						onChange={(option: OptionType) => {
							handleChangeSelect('fontColor', option);
						}}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selected.backgroundColor}
						options={backgroundColors}
						onChange={(option: OptionType) => {
							handleChangeSelect('backgroundColor', option);
						}}
						title='цвет фона'
					/>
					<Select
						selected={selected.contentWidth}
						options={contentWidthArr}
						onChange={(option: OptionType) => {
							handleChangeSelect('contentWidth', option);
						}}
						title='ширина контекста'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
