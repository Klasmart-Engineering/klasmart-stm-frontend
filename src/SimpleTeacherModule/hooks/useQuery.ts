import React from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function useQueryParams(params: string[]): string[] {
    let res = [];
    let query = useQuery();
    for(let param of params) {
        res.push(query.get(param) || '');
    }
    return res;
}