// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';

// @Controller('users')
// export class UsersController {
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   @Get('admin')
//   getAdminData() {
//     return { message: 'This is admin data' };
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile() {
//     return { message: 'This is the user profile' };
//   }
// }