import { useEffect, useState } from 'react';

import { debounce } from 'lodash-es';

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const debouncedUpdate = debounce((newValue: T) => {
			setDebouncedValue(newValue);
		}, delay);

		debouncedUpdate(value);

		return () => {
			debouncedUpdate.cancel();
		};
	}, [value, delay]);

	return debouncedValue;
};
