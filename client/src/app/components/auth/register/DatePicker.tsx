import { ChangeEventHandler, useState } from 'react';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";
import { es } from 'date-fns/locale';

export default function DatePicker({ id, inputValue, setInputValue, selected, setSelected }: { id: string, inputValue: string, setInputValue: any, selected: any, setSelected: any }) {

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleDaySelect: SelectSingleEventHandler = (date: any) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, 'y-MM-dd'));
        } else {
            setInputValue('');
        }
    };

    return (
        <>
            <div className='flex items-center w-full h-12 p-3 border border-secondary-gray rounded-3xl'>
                <div className="flex justify-between w-full dropdown dropdown-hover cursor-default" tabIndex={22}>
                    <input
                        id={id}
                        disabled
                        className='focus:outline-none bg-transparent cursor-default'
                        type="text"
                        placeholder={format(new Date(), 'dd - MM - y')}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    Seleccione una fecha
                    <div className="dropdown-menu dropdown-menu-bottom-center w-full mt-10 bg-secondary-white">
                        <a tabIndex={-1}>
                            <DayPicker
                                locale={es}
                                captionLayout="dropdown-buttons"
                                showOutsideDays
                                defaultMonth={new Date(1960, 0)}
                                fromYear={1960} toYear={2014}
                                className='h-full flex justify-center'
                                classNames={defaultStyles}
                                mode="single"
                                selected={selected}
                                onSelect={handleDaySelect}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}