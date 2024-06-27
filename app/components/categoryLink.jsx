// components/CategoryLink.js
import Link from 'next/link';

export const CategoryLink = ({ category }) => {
    return (
        <Link className='text-sm' href={`/${category?.id}`}>
            {category?.name}
        </Link >
    );
};
