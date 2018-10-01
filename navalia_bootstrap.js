const ShardingManager = require("discord.js").ShardingManager;

class Bootstrap extends ShardingManager {
    constructor (config) {
        super(config.file, config);

        this.config = config;
    }

    /**
     * Soma as propriedades retornadas pelo this.fetchClientValues
     * SÓ PODE SER USADO COM NÚMEROS
     * 
     * @param {String} prop A propriedade para ser obtida
     * 
     * @example .countValues("guilds.size")
     * @returns {Number} A soma de cada valor retornado por cada shard.
     */
    async countValues (prop) {
        const values = await this.fetchClientValues(prop);
        return values.reduce((prev, val) => prev + val, 0);
    }

    /**
     * Executa JavaScript entre shards.
     * 
     * @param {String} script
     */
    async broadcastEvalNotNull (script) {
        const results = await this.broadcastEval(script);

        return results.filter(r => !!r);
    }
}

module.exports = Bootstrap;