import type { NextApiRequest, NextApiResponse } from 'next';

type Item = {
    id: number;
    name: string;
};

type Data = {
    items: Item[];
};

const items: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ items });
}

// visit http://localhost:3000/api/items
