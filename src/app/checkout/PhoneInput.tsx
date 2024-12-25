// import React, { ChangeEvent, useEffect, useRef } from 'react';

// interface PhoneInputProps {
//     value: string;
//     onChange: (value: string) => void;
//     error?: string;
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
//     const inputRef = useRef<HTMLInputElement>(null);

//     const formatDigits = (digits: string): string => {
//         let formatted = '+998 ';

//         if (digits.length === 0) {
//             return formatted;
//         }

//         if (digits.length < 2) {
//             formatted += '(' + digits;
//             return formatted;
//         }

//         formatted += '(' + digits.slice(0, 2) + ') ';

//         if (digits.length < 5) {
//             formatted += digits.slice(2);
//             return formatted;
//         }

//         formatted += digits.slice(2, 5) + '-';

//         if (digits.length < 7) {
//             formatted += digits.slice(5);
//             return formatted;
//         }

//         formatted += digits.slice(5, 7) + '-';

//         if (digits.length <= 9) {
//             formatted += digits.slice(7);
//         }

//         return formatted;
//     };

//     const getDigitsAndCursor = (formattedValue: string, cursorPosition: number): { digits: string; newCursorPosition: number } => {
//         let digits = '';
//         let newCursorPosition = cursorPosition;
//         let digitsBeforeCursor = 0;

//         // Skip the first 5 characters (+998 )
//         for (let i = 5; i < formattedValue.length; i++) {
//             if (/\d/.test(formattedValue[i])) {
//                 digits += formattedValue[i];
//                 if (i < cursorPosition) {
//                     digitsBeforeCursor++;
//                 }
//             } else if (i < cursorPosition) {
//                 newCursorPosition--;
//             }
//         }

//         return { digits, newCursorPosition: digitsBeforeCursor };
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const input = e.target;
//         const cursorPosition = input.selectionStart || 0;

//         const { digits, newCursorPosition } = getDigitsAndCursor(input.value, cursorPosition);

//         let processedDigits = digits;
//         if (processedDigits.length > 9) {
//             processedDigits = processedDigits.slice(0, 9);
//         }

//         const formatted = formatDigits(processedDigits);
//         onChange(formatted);

//         // setTimeout(() => {
//         //     if (inputRef.current) {
//         //         // const newPosition = calculateCursorPosition(formatted, newCursorPosition);
//         //         inputRef.current.setSelectionRange(newPosition, newPosition);
//         //     }
//         // }, 0);
//     };

//     // const calculateCursorPosition = (formatted: string, digitsBeforeCursor: number): number => {
//     //     let position = 5; // Start after '+998 '
//     //     let digitCount = 0;

//     //     for (let i = 5; i < formatted.length && digitCount < digitsBeforeCursor; i++) {
//     //         if (/\d/.test(formatted[i])) {
//     //             digitCount++;
//     //         }
//     //         position++;
//     //     }

//     //     // Check if we should position cursor before a formatting character
//     //     if (formatted[position] === '-' || formatted[position] === ' ' || formatted[position] === ')') {
//     //         return position;
//     //     }

//     //     return position;
//     // };

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const paste = e.clipboardData.getData('text');
//         let digits = paste.replace(/\D/g, '');

//         if (digits.startsWith('998')) {
//             digits = digits.slice(3);
//         }

//         if (digits.length > 9) {
//             digits = digits.slice(0, 9);
//         }

//         const formatted = formatDigits(digits);
//         onChange(formatted);

//         setTimeout(() => {
//             if (inputRef.current) {
//                 const length = formatted.length;
//                 inputRef.current.setSelectionRange(length, length);
//             }
//         }, 0);
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Backspace' && inputRef.current) {
//             const cursorPosition = inputRef.current.selectionStart || 0;

//             if (cursorPosition <= 5) {
//                 e.preventDefault();
//                 return;
//             }

//             const charBeforeCursor = value[cursorPosition - 1];
//             if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
//                 e.preventDefault();
//                 const { digits } = getDigitsAndCursor(value, cursorPosition - 1);
//                 const newDigits = digits.slice(0, -1);
//                 const formatted = formatDigits(newDigits);
//                 onChange(formatted);

//                 // setTimeout(() => {
//                 //     if (inputRef.current) {
//                 //         const newPosition = calculateCursorPosition(formatted, digits.length - 1);
//                 //         inputRef.current.setSelectionRange(newPosition, newPosition);
//                 //     }
//                 // }, 0);
//             }
//         }
//     };

//     useEffect(() => {
//         if (!value.startsWith('+998 ')) {
//             onChange('+998 ');
//         }
//     }, [value, onChange]);

//     return (
//         <div className="form-group">
//             <label htmlFor="phone">Телефон</label>
//             <input
//                 type="tel"
//                 id="phone"
//                 ref={inputRef}
//                 value={value}
//                 onChange={handleChange}
//                 onPaste={handlePaste}
//                 onKeyDown={handleKeyDown}
//                 placeholder="+998 (__) ___-__-__"
//                 required
//                 pattern="\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}"
//                 aria-invalid={error ? 'true' : 'false'}
//                 aria-describedby="phone-error"
//                 className={`number-input ${error ? 'input-error' : ''}`}
//             />
//             {error && (
//                 <span id="phone-error" className="error-message">
//                     {error}
//                 </span>
//             )}
//         </div>
//     );
// };

// export default PhoneInput;

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [touched, setTouched] = useState(false);

    const formatDigits = (digits: string): string => {
        let formatted = '+998 ';

        if (digits.length === 0) {
            return formatted;
        }

        if (digits.length < 2) {
            formatted += '(' + digits;
            return formatted;
        }

        formatted += '(' + digits.slice(0, 2) + ') ';

        if (digits.length < 5) {
            formatted += digits.slice(2);
            return formatted;
        }

        formatted += digits.slice(2, 5) + '-';

        if (digits.length < 7) {
            formatted += digits.slice(5);
            return formatted;
        }

        formatted += digits.slice(5, 7) + '-';

        if (digits.length <= 9) {
            formatted += digits.slice(7);
        }

        return formatted;
    };

    const getDigitsAndCursor = (formattedValue: string, cursorPosition: number): { digits: string; newCursorPosition: number } => {
        let digits = '';
        let newCursorPosition = cursorPosition;
        let digitsBeforeCursor = 0;

        for (let i = 5; i < formattedValue.length; i++) {
            if (/\d/.test(formattedValue[i])) {
                digits += formattedValue[i];
                if (i < cursorPosition) {
                    digitsBeforeCursor++;
                }
            } else if (i < cursorPosition) {
                newCursorPosition--;
            }
        }

        return { digits, newCursorPosition: digitsBeforeCursor };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const cursorPosition = input.selectionStart || 0;

        const { digits, newCursorPosition } = getDigitsAndCursor(input.value, cursorPosition);

        let processedDigits = digits;
        if (processedDigits.length > 9) {
            processedDigits = processedDigits.slice(0, 9);
        }

        const formatted = formatDigits(processedDigits);
        onChange(formatted);

        // setTimeout(() => {
        //     if (inputRef.current) {
        //         const newPosition = calculateCursorPosition(formatted, newCursorPosition);
        //         inputRef.current.setSelectionRange(newPosition, newPosition);
        //     }
        // }, 0);
    };

    // const calculateCursorPosition = (formatted: string, digitsBeforeCursor: number): number => {
    //     let position = 5;
    //     let digitCount = 0;

    //     for (let i = 5; i < formatted.length && digitCount < digitsBeforeCursor; i++) {
    //         if (/\d/.test(formatted[i])) {
    //             digitCount++;
    //         }
    //         position++;
    //     }

    //     if (formatted[position] === '-' || formatted[position] === ' ' || formatted[position] === ')') {
    //         return position;
    //     }

    //     return position;
    // };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        let digits = paste.replace(/\D/g, '');

        if (digits.startsWith('998')) {
            digits = digits.slice(3);
        }

        if (digits.length > 9) {
            digits = digits.slice(0, 9);
        }

        const formatted = formatDigits(digits);
        onChange(formatted);

        setTimeout(() => {
            if (inputRef.current) {
                const length = formatted.length;
                inputRef.current.setSelectionRange(length, length);
            }
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && inputRef.current) {
            const cursorPosition = inputRef.current.selectionStart || 0;

            if (cursorPosition <= 5) {
                e.preventDefault();
                return;
            }

            const charBeforeCursor = value[cursorPosition - 1];
            if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
                e.preventDefault();
                const { digits } = getDigitsAndCursor(value, cursorPosition - 1);
                const newDigits = digits.slice(0, -1);
                const formatted = formatDigits(newDigits);
                onChange(formatted);

                // setTimeout(() => {
                //     if (inputRef.current) {
                //         const newPosition = calculateCursorPosition(formatted, digits.length - 1);
                //         inputRef.current.setSelectionRange(newPosition, newPosition);
                //     }
                // }, 0);
            }
        }
    };

    const isValidPhoneNumber = (phone: string): boolean => {
        return phone.length === 19;
    };

    useEffect(() => {
        if (!value.startsWith('+998 ')) {
            onChange('+998 ');
        }
    }, [value, onChange]);

    return (
        <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
                type="tel"
                id="phone"
                ref={inputRef}
                value={value}
                onChange={handleChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onBlur={() => setTouched(true)}
                placeholder="+998 (__) ___-__-__"
                required
                pattern="\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}"
                aria-invalid={touched && !isValidPhoneNumber(value) ? 'true' : 'false'}
                aria-describedby="phone-error"
                className={`number-input ${touched && !isValidPhoneNumber(value) ? 'input-error' : ''}`}
            />
            {touched && !isValidPhoneNumber(value) && (
                <span id="phone-error" className="error-message">
                    Неверный формат телефона.
                </span>
            )}
        </div>
    );
};

export default PhoneInput;