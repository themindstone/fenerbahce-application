
create extension "uuid-ossp";

create table auctions (
    id uuid primary key unique not null,
    name varchar(255) not null,
    selled_to_address varchar(255),
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
--     slug varchar(255) not null,
    start_price numeric(78, 0) not null,
    buynow_price numeric(78, 0) not null,
    bid_increment numeric(78, 0) not null,
    photoUrls text[] not null,
    is_selled boolean not null default false,
    is_active boolean not null default false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

create table balances
(
    id           uuid primary key unique not null,
    auction_id   uuid                    not null,
    user_address varchar(255),
    balance        numeric(78, 0) default 0           not null,
    unique (auction_id, user_address)
);

create unique index idx_balance_user_address_auction_id on balances (user_address, auction_id);
