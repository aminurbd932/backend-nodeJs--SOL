"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_detail_entity_1 = require("../order-detail/entities/order-detail.entity");
const order_detail_repository_1 = require("../order-detail/order-detail.repository");
const order_entity_1 = require("./entities/order.entity");
const order_repository_1 = require("./order.repository");
let OrderService = class OrderService {
    constructor(ordersRepository, orderDetailsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    async create(createOrderDto) {
        const order = new order_entity_1.Order();
        order.userId = 1;
        order.lessDiscount = createOrderDto.lessDiscount;
        order.orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
        order.shippingName = createOrderDto.shippingName;
        order.shippingPhoneNo = createOrderDto.shippingPhoneNo;
        order.shippingAddress = createOrderDto.shippingAddress;
        const savedOrder = await this.ordersRepository.save(order);
        let orderDetailsList = [];
        createOrderDto.orderDetails.forEach(orderDet => {
            const orderDetails = new order_detail_entity_1.OrderDetail();
            orderDetails.product = orderDet.product;
            orderDetails.quantity = orderDet.quantity;
            orderDetails.order = savedOrder;
            orderDetailsList.push(orderDetails);
        });
        await this.orderDetailsRepository.save(orderDetailsList);
    }
    findAll() {
        return `This action returns all order`;
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_repository_1.OrdersRepository)),
    __metadata("design:paramtypes", [order_repository_1.OrdersRepository,
        order_detail_repository_1.OrderDetailsRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map