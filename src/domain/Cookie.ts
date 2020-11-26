import { DomainValueObject } from 'domain-objects';

export interface Cookie {
  name: string;
  value: string;
}

export class Cookie extends DomainValueObject<Cookie> implements Cookie {}
