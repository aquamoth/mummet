import { track, addOrUpdate, commit, findModified } from 'mummet-core';

type Entity = { id: number; value: string };

const state0 = { 1: track<Entity>({ id: 1, value: 'a' }) } as const;

const s1 = addOrUpdate({ ...state0 }, { id: 2, value: 'b' }, 'id');
const s2 = addOrUpdate({ ...s1 }, { id: 1, value: 'aa' }, 'id');
const s3 = commit({ ...s2 }, [1, 2]);

const modified = findModified(s3 as any);
console.log('modified count', modified.length);
console.log('first underlying equals current?', modified[0]?.current === modified[0]?.underlying);
