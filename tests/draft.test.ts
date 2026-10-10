import test from 'node:test';import assert from 'node:assert/strict';
import { restoreDraft, chooseFeel } from '../src/features/brief/draft';
test('corrupt or unknown-schema drafts restore safely',()=>{for(const raw of ['{','{"schemaVersion":2}',null])assert.equal(restoreDraft(raw).feel,'precise');});
test('selection changes a real draft revision immediately and same selection is idempotent',()=>{const a=restoreDraft(null);const b=chooseFeel(a,'playful');assert.equal(b.feel,'playful');assert.equal(b.revision,a.revision+1);assert.equal(chooseFeel(b,'playful'),b);});
