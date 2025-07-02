'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

const Test = () => {
	const [count, setCount] = useState(0);
	const countRef = useRef(0);

	console.log('Component re-rendered');
	console.log(count);

	const increase = () => {
		countRef.current += 1;
		console.log('Count is', countRef.current);
	};

	const [keyword, setKeyword] = useState('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			console.log('🔍 Search API với từ khóa:', keyword);
			// Gọi API ở đây
		}, 500);
	}, [keyword]);

	useMemo(() => console.log("Memo: " + count), [count]);

	return (
		<div>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>Tăng</button>
			
			<div>
				<p>=======================</p>
				Ref
				<p>{countRef.current}</p>
				<button onClick={increase}>Tăng (console only)</button>
			</div>

			<div>
				<p>---------------------</p>
				<input value={keyword} onChange={e => setKeyword(e.target.value)} className="border" />
			</div>
		</div>
	);
};

export default Test;
