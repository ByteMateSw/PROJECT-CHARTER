import { Strategy as GoogleStrategy, Profile} from 'passport-google-oauth2';
import passport from 'passport';
import { User } from 'src/user/user.entity';


const GOOGLE_CLIENT_ID = '483719238317-0b67hs4cfkkhbr17ieikrknd9h7oib12.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET= '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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile: Profile, done) => {
    const user = await User.findOne({googleId : profile.id});

    if (user){
        return done(null, user)
    }else{
        const newUser = new User({
            googleId: profile.id
        })
    }
  }))
  
  