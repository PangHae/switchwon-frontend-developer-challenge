/**
 * localStorage 유틸리티 함수
 * 클라이언트 사이드에서만 동작합니다.
 */
export const getLocalStorage = (key: string): string | null => {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string): void => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string): void => {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(key);
};
