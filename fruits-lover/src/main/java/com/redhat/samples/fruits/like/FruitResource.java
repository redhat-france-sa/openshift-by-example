package com.redhat.samples.fruits.like;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.logging.Logger;

@Path("/api")
public class FruitResource {
    Logger logger = Logger.getLogger(FruitResource.class);
    
    @POST 
    @Path("/like/fruit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Fruit like(Fruit fruit) {
        //do complicated stuff like sending a kafka message
        logger.info("Fruit has been liked ! ");
        return fruit;
    }

    @POST 
    @Path("/unlike/fruit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Fruit unlike(Fruit fruit) {
        //do complicated stuff like sending a kafka message
        logger.info("Fruit has been unliked ! ");
        return fruit;
    }
}