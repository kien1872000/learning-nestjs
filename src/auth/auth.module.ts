import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { JwtAuthGuard } from './jwt.authguard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local.authguard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '7200s' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    JwtAuthGuard,
    LocalAuthGuard
  ],
  exports: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    JwtAuthGuard,
    LocalAuthGuard
  ]
})
export class AuthModule { }
